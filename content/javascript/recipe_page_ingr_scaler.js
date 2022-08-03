
import scaleIngrHelp from './lib/scale_recipe_quantities.js';

var SCALABLE_AMOUNTS = scaleIngrHelp.ScalableAmounts.fromDocument(document);

const onClick = (event) => {
	
	console.log("CALLED ON CLICK");
	const formData = new FormData(event.target)
	const formProps = Object.fromEntries(formData);

	console.log(formProps);

	//Set the ingredient amounts
	SCALABLE_AMOUNTS.replaceDocValsWithScaled(document, formProps.nPortions);


	event.preventDefault();
}

let formEle = document.querySelector(".scale-ingr-form");


formEle.addEventListener("submit", onClick);


