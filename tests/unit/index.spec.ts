// jest.mock("xmlbuilder2");

import { CersTVClient } from '../../src/index'

describe('Constructor', () => {
  describe('when well-formed parameters are given', () => {
    it('should not throw an error', () => {
      expect(() => {new CersTVClient('192.168.1.138', '20:DE:20:DE:20:DE', 'bravia', undefined, 'http');}).not.toThrowError();
      expect(() => {new CersTVClient('192.168.1.138', '20:DE:20:DE:20:DE', 'bravia', 1138, 'http');}).not.toThrowError();
    });
  });
  describe('when the host is empty', () => {
    it('should throw an error', () => {
      expect(() => {new CersTVClient('', '20:DE:20:DE:20:DE', 'bravia');}).toThrow('host is empty');
    });
  });
  describe('when the mac address is empty', () => {
    it('should throw an error', () => {
      expect(() => {new CersTVClient('192.168.1.138', '', 'bravia');}).toThrow('mac address is empty');
    });
  });
  describe('when the mac address is invalid', () => {
    it('should throw an error', () => {
      expect(() => {new CersTVClient('192.168.1.138', 'xxxx', 'bravia');}).toThrow('mac address is malformed');
      expect(() => {new CersTVClient('192.168.1.138', '1234', 'bravia');}).toThrow('mac address is malformed');
    });
  });
  describe('when port is out of range', () => {
    it('should throw an error', () => {
      expect(() => {new CersTVClient('192.168.1.138', '20:DE:20:DE:20:DE', 'test', -1);}).toThrow('port is out of range');
      expect(() => {new CersTVClient('192.168.1.138', '20:DE:20:DE:20:DE', 'test', 65536);}).toThrow('port is out of range');
    });
  });
});