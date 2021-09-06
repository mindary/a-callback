import * as fs from 'fs';
import path from 'path';
import {expect} from '@loopback/testlab';
import {fromCallback, fromCb, fromNode} from '../..';

describe('fromCallback', function () {
  it('resolved with single arg', async () => {
    const data = await fromCallback(cb => fs.readFile(path.resolve(__dirname, '../fixtures/example.json'), null, cb));
    expect(JSON.parse(data.toString())).eql({foo: 'bar'});
  });

  it('resolved with multiple args', async () => {
    let data = await fromCallback(
      cb => fs.readFile(path.resolve(__dirname, '../fixtures/example.json'), null, cb),
      true,
    );
    expect(Array.isArray(data)).is.true();

    data = await fromCallback(cb => fs.readFile(path.resolve(__dirname, '../fixtures/example.json'), null, cb), {
      multiArgs: true,
    });
    expect(Array.isArray(data)).is.true();
  });

  it('rejected', async () => {
    await expect(fromCallback(cb => fs.readFile('not_exists', null, cb))).rejectedWith(/ENOENT/);
  });

  it('fromNode and fromCb alias', function () {
    expect(fromNode).equal(fromCallback);
    expect(fromCb).equal(fromCallback);
  });
});
