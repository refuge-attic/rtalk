var Session = function(password, salt, options) {

	var self = this;

	this._box_keypair = [];
	this._sign_keypair = [];
	this.id = "";
	this.version = "0000";

	this._init(password, salt);

	this._init_id();


}

Session.prototype._init = function(password, salt) {
	// calculate box and sign keypairs from the password and salt
	// TODO: make scrypt settings configurable
	key8bytes = scrypt.crypto_scrypt(scrypt.encode_utf8(password),
			scrypt.encode_utf8(salt),
			16384, 8, 1, 64);

	this._box_keypair = nacl.crypto_box_keypair_from_seed(key8bytes);
	this._sign_keypair = nacl.crypto_sign_keypair_from_seed(
			nacl.crypto_hash_string(key8bytes).subarray(0, 32));
}

Session.prototype._init_id = function() {

	// 1. concatenate box pub key and sign pub key
	var id = nacl.to_hex(this._box_keypair.boxPk) +
		nacl.to_hex(this._sign_keypair.signPk);

	// 2. peform sha512 on spub and perform ripemd 160  hash on it
	id = CryptoJS.RIPEMD160(nacl.to_hex(nacl.crypto_hash_string(id)),
			{asBytes: true})
	.toString();

	// 3. add version to the ripe
	id = this.version + id;

	// 4. peform sha512(sha512(version+ripe))
	var checksum = nacl.crypto_hash(nacl.crypto_hash_string(id));

	// 5. get t he first 4 bit of the checksum hash to have the address checksum
	checksum = checksum.subarray(0, 3);

	// 6. append the ckecksum to the id
	id = id + nacl.to_hex(checksum);

	// 7. encode to base58
	id = base58.encode(hex2bytes(id));

	// set the session id
	this.id = id;
}
