import request from "@/utils/request";

export function getExamList(data) {
  return request({
    url: "/lls/newexam/exam/studentPage",
    method: "POST",
    data,
  });
}

export function deleteSchool() {
  return request({
    url: "/getInfo",
    method: "get",
  });
}
