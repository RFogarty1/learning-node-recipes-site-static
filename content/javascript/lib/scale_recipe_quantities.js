

class ScalableAmounts {

	constructor(initialAmounts){
		this.initialAmounts = initialAmounts;
	}

	static fromDocument(inpDoc){
		let allAmounts = inpDoc.querySelectorAll("ingr-amount")
		let outVals = [];
		let tempVal;
		for (let i = 0; i < allAmounts.length; i++){
			tempVal = parseFloat(allAmounts[i].innerHTML);
			outVals.push(tempVal);
		}

		return new ScalableAmounts(outVals);
	}

	getScaledValues(scaleFactor){
		return this.initialAmounts.map( (inpVal) => inpVal*scaleFactor );
	}

	replaceDocValsWithScaled(inpDoc, scaleFactor){
		let allElements = inpDoc.querySelectorAll("ingr-amount");
		for (let i = 0; i < allElements.length; i++){
			allElements[i].innerHTML =+parseFloat(this.initialAmounts[i]*scaleFactor).toFixed( 2 );
		}
	}

}

const scaleQuantitiesAndUpdateDocument = (inpDoc, inpScalableAmounts, inpScaleFactor) =>{
	return null;
}


const scaleRecipeQuantitiesAndUpdateDom = (inpDom, scaleFactor) => {
	return null;
} 


//We will need to export an event handler that listens for changes
export default { ScalableAmounts };

//module.exports = {  ScalableAmounts };

