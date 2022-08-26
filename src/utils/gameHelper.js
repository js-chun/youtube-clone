export const createArray = (rows, cols) => {
	const arr = []
	for (let x = 0; x < rows; x++) {
		arr.push(Array(cols).fill(0))
	}
	return arr
}

export const getCopyOfStage = (stageToCopy) => {
	return stageToCopy.map((row) => {
		return row.map((col) => col)
	})
}

export const updateStage = (staticStage, locations, num) => {
	const result = getCopyOfStage(staticStage)
	locations.forEach((loc) => {
		result[loc.x][loc.y] = num
	})
	return result
}

const removeRows = (updatedStage, rowNums) => {
	const beforeStage = getCopyOfStage(updatedStage)
	for (let completeRow of rowNums) {
		for (let row = completeRow; row > 0; row--) {
			beforeStage[row] = [...beforeStage[row - 1]]
		}
		beforeStage[0] = Array(10).fill(0)
	}
	return beforeStage
}

export const checkAndRemoveRows = (updatedStage, changedLocs) => {
	const rowsChanged = []
	changedLocs.forEach((loc) => {
		if (!rowsChanged.includes(loc.x)) rowsChanged.push(loc.x)
	})
	const rowsComplete = []
	for (let row of rowsChanged) {
		if (updatedStage[row].every((col) => col !== 0)) {
			rowsComplete.push(row)
		}
	}
	if (rowsComplete.length !== 0) {
		return removeRows(updatedStage, rowsComplete)
	} else {
		return updatedStage
	}
}
