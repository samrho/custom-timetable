const getDataAfterColon = (codeElement) => {
	const messageThatHasCode = codeElement.textContent;
	const actualCode = messageThatHasCode.split(":")[1].trim();
	return actualCode;
};

const getLectureInfo = (cardElement) => {
	const title = cardElement.childNodes[0].textContent;
	const code = getDataAfterColon(cardElement.childNodes[2].childNodes[0]);
	const prof = getDataAfterColon(cardElement.childNodes[2].childNodes[1]);
	return [title, code, prof];
};

export { getDataAfterColon, getLectureInfo };
