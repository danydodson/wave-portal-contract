const main = async () => {
	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
	const parsedEther = await hre.ethers.parseEther("0.001")
	let waveContract = await waveContractFactory.deploy({ value: parsedEther })
	await waveContract.waitForDeployment()
	let waveAddress = await waveContract.getAddress()
	console.log("WavePortal address: ", waveAddress)

	/*
	 * Get Contract balance
	 */
	let contractBalance = await hre.ethers.provider.getBalance(waveAddress)
	console.log("Contract balance:", await hre.ethers.formatEther(contractBalance))

	/*
	 * Let's try two waves now
	 */
	const waveTxn = await waveContract.wave("This is wave #1")
	await waveTxn.wait()

	const waveTxn2 = await waveContract.wave("This is wave #2")
	await waveTxn2.wait()

	contractBalance = await hre.ethers.provider.getBalance(waveAddress)
	console.log("Contract balance:", await hre.ethers.formatEther(contractBalance))

	let allWaves = await waveContract.getAllWaves()
	console.log(allWaves)
}

const runMain = async () => {
	try {
		await main()
		process.exit(0)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

runMain()