const getCodeName = (codeElement) => {
	// const codeElement = document.querySelector(".lecture-code__code")
	// 	.childNodes[1];
	const messageThatHasCode = codeElement.textContent;
	const actualCode = messageThatHasCode.split(":")[1].trim();
	return actualCode;
};

export { getCodeName };
