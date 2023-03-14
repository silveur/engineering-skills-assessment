const shortid = require('shortid')
const { deterministicPartitionKey, MAX_PARTITION_KEY_LENGTH } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  
  it("Returns the same output as input", () => {
    const partitionKey = shortid.generate()
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).toBe(partitionKey);
  });
  
  it("Should handle very long event string", () => {
    const trivialKey = deterministicPartitionKey({ veryveryverylongevent: 'veryveryverylongeventveryveryverylongeventveryveryverylongevent' });
    expect(trivialKey.length).toBe(MAX_PARTITION_KEY_LENGTH/2);
  });
});
