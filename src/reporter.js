/*

Examples reporter for Mocha test-runner

 _   ______  __   _______  ____    _  ____________
| | / / __ \/ /  / __/ _ )/ __ \  / |/ / __/_  __/
| |/ / /_/ / /__/ _// _  / /_/ / /    / _/  / /
|___/\____/____/___/____/\____(_)_/|_/___/ /_/


Copyright (C) 2017 Volebo <dev@volebo.net>
Copyright (C) 2017 Koryukov Maksim <maxkoryukov@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the MIT License, attached to this software package.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

You should have received a copy of the MIT License along with this
program. If not, see <https://opensource.org/licenses/MIT>.

http://spdx.org/licenses/MIT

 */

"use strict"

const mocha = require('mocha')

module.exports = function(runner) {
	const Base = mocha.reporters.Base
	Base.call(this, runner)
	const color = Base.color

	let passes = 0
	let failures = 0
	let indent = 0

console.log(runner)

	const preappends = {
		ok: color('bright pass', "" + Base.symbols.ok),
		err: color('bright fail', "" + Base.symbols.err)
	}

	runner.on('suite', function(suite) {
		console.log('%s%s', ' '.repeat(indent), color('suite', "" + suite.title))
		return indent += 1
	})
	runner.on('suite end', function(suite) {
		indent -= 1
		if (indent === 1) {
			return console.log('')
		}
	})
	runner.on('pass', function(test) {
		passes += 1
		return console.log('%s %s %s', ' '.repeat(indent), preappends.ok, test.title)
	})
	runner.on('fail', function(test, err) {
		failures += 1
		return console.log('%s %s %s', ' '.repeat(indent), preappends.err, test.title)
	})
	return runner.on('end', function() {
		return process.exit(failures)
	})
}
