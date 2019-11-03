import { getDataAfterColon, getLectureInfo } from "./utils.js";
// 모달 나타내기 하기
$(".card-lecture").click(function(event) {
	$("#modal-lecture-info").modal("show");
	const data = event.currentTarget;
	const modal = $("#modal-lecture-info");
	modal.find(".lecture-title").text(data.childNodes[0].innerText);
	modal
		.find(".lecture-time > span")
		.text(data.childNodes[1].childNodes[1].innerText);
	modal
		.find(".lecture-code__code > span")
		.text(data.childNodes[2].childNodes[0].innerText);
	modal
		.find(".lecture-code__prof > span")
		.text(data.childNodes[2].childNodes[1].innerText);

	modal
		.find(".lecture-code__location > span")
		.text(data.childNodes[2].childNodes[2].innerText);
});

$(".lecture-time > a").click(function() {
	$("#modal-lecture-task").modal("show");
});

$(function() {
	$('[data-toggle="tooltip"]').tooltip();
});

$(function() {
	$('[data-toggle="popover"]').popover({
		container: "body",
		html: true,
		placement: "right",
		sanitize: false,
		content: function() {
			return $("#PopoverContent").html();
		},
	});
});

const lecture = document.querySelector(".registerBtn");
const registerHandler = (e) => {
	const selectedLecture =
		e.target.parentNode.previousSibling.childNodes[1].childNodes[1];
	const selectedCodeName = getDataAfterColon(selectedLecture);
	registerOnTheTable(selectedCodeName);
};

lecture.addEventListener("click", registerHandler);

const registerOnTheTable = async (lectureCode) => {
	const URL = `/api/add/${lectureCode}`;
	const result = await fetch(URL, {
		method: "POST",
	});
	const { message } = await result.json();
	if (message) alert(message);
	// if (result.ok) {
	// 	document.querySelector("body").innerHTML = `<h1>${result}</h1>`;
	// }

	$("#modal-lecture-info").modal("hide");
	// location.reload();
};

//search control
const input = document.querySelector(".form-control");
const searchFilterHandler = (e) => {
	const filter = e.target.value.toUpperCase();
	const lectureList = document.querySelectorAll(".card-lecture");
	lectureList.forEach((lecture) => {
		const [title, code, prof] = getLectureInfo(lecture);
		if (
			title.includes(filter) ||
			code.includes(filter) ||
			prof.includes(filter)
		) {
			lecture.style.display = "block";
		} else {
			lecture.style.display = "none";
		}
	});
};
input.addEventListener("keyup", searchFilterHandler);
