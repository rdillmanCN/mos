'use strict'
const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const createShields = require('./create-shields')

describe('createShields', () => {
  it('should create flat shield by default', () => {
    const shields = createShields({
      github: {
        user: 'zkochan',
        repo: 'mos',
      },
      pkg: {
        name: 'mos',
      },
    })
    expect(shields('travis')).to.eq('[![Build status](https://img.shields.io/travis/zkochan/mos.svg?style=flat)](https://travis-ci.org/zkochan/mos)')
  })

  it('should create flat travis shield', () => {
    const shields = createShields({
      github: {
        user: 'zkochan',
        repo: 'mos',
      },
      pkg: {
        name: 'mos',
      },
    })
    expect(shields.flat('travis')).to.eq('[![Build status](https://img.shields.io/travis/zkochan/mos.svg?style=flat)](https://travis-ci.org/zkochan/mos)')
  })

  it('should create flat square travis shield', () => {
    const shields = createShields({
      github: {
        user: 'zkochan',
        repo: 'mos',
      },
      pkg: {
        name: 'mos',
      },
    })
    expect(shields.flatSquare('travis')).to.eq('[![Build status](https://img.shields.io/travis/zkochan/mos.svg?style=flat-square)](https://travis-ci.org/zkochan/mos)')
  })

  it('should create plastic travis shield', () => {
    const shields = createShields({
      github: {
        user: 'zkochan',
        repo: 'mos',
      },
      pkg: {
        name: 'mos',
      },
    })
    expect(shields.plastic('travis')).to.eq('[![Build status](https://img.shields.io/travis/zkochan/mos.svg?style=plastic)](https://travis-ci.org/zkochan/mos)')
  })

  it('should create several shields', () => {
    const shields = createShields({
      github: {
        user: 'zkochan',
        repo: 'mos',
      },
      pkg: {
        name: 'mos',
      },
    })
    expect(shields.plastic('travis', 'npm')).to.eq([
      '[![Build status](https://img.shields.io/travis/zkochan/mos.svg?style=plastic)](https://travis-ci.org/zkochan/mos)',
      '[![NPM version](https://img.shields.io/npm/v/mos.svg?style=plastic)](https://www.npmjs.com/package/mos)',
    ].join('\n'))
  })
})