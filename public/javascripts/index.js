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

$(".lecture-time > a").click(async function(event) {
	$("#modal-lecture-task").modal("show");
	const data = event.currentTarget;
	const selectedLectureName = data.childNodes[0].childNodes[0].textContent;
	const URL = `/api/find/${selectedLectureName}`;
	const tempResult = await fetch(URL);
	const result = await tempResult.json();
	const modal = $("#modal-lecture-task");
	const timeAndDaysString = `${result.data.start_time}:00 - ${result.data.end_time}:00 | ${result.data.dayofweek}`;
	const memo = result.data.memo || "memo를 입력해 주세요";
	modal.find(".lecture-time > span").text(timeAndDaysString);
	modal.find(".modal-body .lecture-title").text(selectedLectureName);
	modal.find(".lecture-code__code > span").text(result.data.code);
	modal.find(".lecture-code__prof > span").text(result.data.professor);
	modal.find(".lecture-code__location > span").text(result.data.location);

	modal.find(".txt-description").text(result.data.description);
	modal.find(".lecture-noti-title").text(memo);
	modal.find(".modal-footer .right .btn-danger").on("click", () => {
		removeFromTable(result.data.code);
		modal.modal("hide");
		location.reload();
	});
});

async function removeFromTable(lectureCode) {
	const URL = `/api/delete/${lectureCode}`;
	const result = await fetch(URL, {
		method: "POST",
	});
	const { message } = await result.json();
	// if (message) alert(message);
}

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

const memoAddBtn = document.querySelector(".btn-save");
memoAddBtn.addEventListener("click", (event) => {
	// const memoTitle = $("#recipient-name").value;
	// const memoContent = $("#message-text").value;
	alert("hi");
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
	const { message, OK } = await result.json();
	if (!OK) alert(message);
	$("#modal-lecture-info").modal("hide");
	location.reload();
};
//search control
const input = document.querySelector(".form-control");
const searchFilterHandler = (e) => {
	const filter = e.target.value.toUpperCase();
	console.log(filter);
	const lectureList = document.querySelectorAll(".card-lecture");
	lectureList.forEach((lecture) => {
		const [title, code, prof] = getLectureInfo(lecture);
		if (
			title.toUpperCase().includes(filter) ||
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
