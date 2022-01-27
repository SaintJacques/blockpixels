ACCOUNT_ID="blockpixels.testnet"

build-contract:
	cd contracts && cargo build --target wasm32-unknown-unknown --release 

cp-contract:
	cp ./contracts/target/wasm32-unknown-unknown/release/blockpixels.wasm ./out/blockpixels.wasm

fmt-contract:
	cd contracts && cargo fmt

run-front:
	cd src && yarn dev

deploy:
	$(MAKE) build-contract &&  $(MAKE) cp-contract && near deploy -f --accountId $(ACCOUNT_ID) --wasmFile ./out/blockpixels.wasm  --initFunction new --initArgs '{}'

dev-deploy:
	$(MAKE) build-contract &&  $(MAKE) cp-contract && near dev-deploy -f --wasmFile ./out/blockpixels.wasm  --initFunction new --initArgs '{}'
