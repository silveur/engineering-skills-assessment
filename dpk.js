const crypto = require("crypto");
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (value) => {
  if(!value) throw new Error("Value is required")
  return crypto.createHash("sha3-512").update(value).digest("hex");
}

/*
  The deterministicPartitionKey ensure a text key is being creating by checking the presence and type of the event input.
  It is clearer to group conditionals rather than having conditionals within other conditional blocks.
  The last step clearly ensure the length of the key.
  It is also safer to export the constants for the tests.
*/

const deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  let candidate;

  if (event)
    candidate = event.partitionKey || createHash(JSON.stringify(event));
  else if (!candidate)
    candidate = TRIVIAL_PARTITION_KEY;
  
  if (typeof candidate !== "string")
    candidate = JSON.stringify(candidate);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH)
    candidate = createHash(candidate);

  return candidate;
};

module.exports = { MAX_PARTITION_KEY_LENGTH, deterministicPartitionKey };