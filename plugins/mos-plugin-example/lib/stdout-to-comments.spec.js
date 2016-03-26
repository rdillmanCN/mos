'use strict'
const describe = require('mocha').describe
const it = require('mocha').it
const afterEach = require('mocha').afterEach
const beforeEach = require('mocha').beforeEach
const expect = require('chai').expect
const stdoutToComments = require('./stdout-to-comments')
const fs = require('fs')
const path = require('path')

describe('stdoutToComments', () => {
  let tmpFileName

  beforeEach(() => {
    tmpFileName = path.resolve(__dirname, 'test-' + Math.random() + '.js')
  })

  function inlineStdoutToComments (code) {
    fs.writeFileSync(tmpFileName, code, 'utf8')
    return stdoutToComments(tmpFileName)
  }

  afterEach(() => {
    fs.unlinkSync(tmpFileName)
  })

  it('should add the console output to the comments', () => {
    return inlineStdoutToComments('console.log("Hello world!")')
      .then(actual =>
        expect(actual).to.eq('console.log("Hello world!")\n//> Hello world!')
      )
  })

  it('should add the multiline console output to the comments', () => {
    return inlineStdoutToComments('console.log("Hello world!\\nHello world!")')
      .then(actual =>
        expect(actual).to.eq([
          'console.log("Hello world!\\nHello world!")',
          '//> Hello world!',
          '//  Hello world!',
        ].join('\n'))
      )
  })

  it('should add several console outputs printed by the same line to the comments', () => {
    return inlineStdoutToComments('"use strict";for (let i = 3; i--;) console.log("Hello world!")')
      .then(actual =>
        expect(actual).to.eq('"use strict";for (let i = 3; i--;) console.log("Hello world!")\n//> Hello world!\n//> Hello world!\n//> Hello world!')
      )
  })

  it('should add several console outputs printed by different lines', () => {
    return inlineStdoutToComments([
      'console.log("foo")',
      'console.log("bar")',
    ].join('\n'))
      .then(actual =>
        expect(actual).to.eq([
          'console.log("foo")',
          '//> foo',
          'console.log("bar")',
          '//> bar',
        ].join('\n'))
      )
  })

  it('should add the JSON console output to the comments', () => {
    return inlineStdoutToComments('console.log({foo: "bar"})')
      .then(actual =>
        expect(actual).to.eq('console.log({foo: "bar"})\n//> { foo: \'bar\' }')
      )
  })

  it('should add the console output of a called function', () => {
    return inlineStdoutToComments([
      'function foo (a) {',
      '  console.log(a)',
      '  console.log(a)',
      '}',
      'foo("Hello world!")',
    ].join('\n'))
    .then(actual =>
      expect(actual).to.eq([
        'function foo (a) {',
        '  console.log(a)',
        '  console.log(a)',
        '}',
        'foo("Hello world!")',
        '//> Hello world!',
        '//> Hello world!',
      ].join('\n'))
    )
  })
})
