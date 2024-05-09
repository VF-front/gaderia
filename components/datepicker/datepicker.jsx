import { useState } from "react"

const DemoComponent = () => {

	const [value, setValue] = useState({ 
		startDate: null,
		endDate: null 
	}); 
	const handleValueChange = (filteredData) => {
		setValue(filteredData);
	}

	return {
		value,
		handleValueChange
	}
}

export default DemoComponent