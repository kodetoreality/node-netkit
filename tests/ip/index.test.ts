import { expect } from 'chai';
import { fromLong, generateIP, isLoopback, toLong } from '@/ip';

describe('Long and Normalize', () => {
  // 127.0.0.1 => 2130706433
  // 255.255.255.255 => 4294967295

  it('should convert IPv4 to long', () => {
    expect(toLong('127.0.0.1')).to.equal(2130706433);
    expect(toLong('255.255.255.255')).to.equal(4294967295);
  });

  it('should convert long to IPv4', () => {
    expect(fromLong(2130706433)).to.equal('127.0.0.1');
    expect(fromLong(4294967295)).to.equal('255.255.255.255');
  });
});

describe('Loopback', () => {
  it('should detect IPv4 loopback', () => {
    expect(isLoopback('127.0.0.1')).to.be.true;
    expect(isLoopback('127.0.0.1/32')).to.be.true;
  });

  it('should detect IPv6 loopback', () => {
    expect(isLoopback('::1')).to.be.true;
    expect(isLoopback('::1/128')).to.be.true;
  });
});

describe('Generate IP', () => {
  it('should get ips from "192.168.1.0/24"', () => {
    const generator = generateIP('192.168.1.0/24');

    const ips = Array.from(generator);

    expect(ips).to.have.lengthOf(254);
    expect(ips[0]).to.equal('192.168.1.1');
  });

  it('should get ips from "127.0.0.1/32"', () => {
    const generator = generateIP('127.0.0.1/32');

    const ips = Array.from(generator);

    expect(ips).to.have.lengthOf(1);
    expect(ips[0]).to.equal('127.0.0.1');
  });
});
