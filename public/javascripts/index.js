import { getCodeName } from "./utils.js";

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
lecture.addEventListener("click", (e) => {
	const selectedLecture =
		e.target.parentNode.previousSibling.childNodes[1].childNodes[1];
	const selectedCodeName = getCodeName(selectedLecture);
	console.log(selectedCodeName);
	registerOnTheTable(selectedCodeName);
});
console.log(lecture.parentNode);

const registerOnTheTable = (lectureCode) => {
	const URL = `/api/add/${lectureCode}`;
	fetch(URL, {
		method: "POST",
	})
		.then((res) => res.json())
		.then((res) => console.log(res));
	$("#modal-lecture-info").modal("hide");
};
