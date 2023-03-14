import request from "@/utils/request";
import { AxiosPromise, AxiosResponse } from "axios";

export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

export async function getExamList(data: Record<string, any>): Promise<Result<{ date: string; name: string; address: string }[]>> {
  return request.request({
    url: "/lls/newexam/exam/studentPage",
    method: "post",
    data,
  });
}

export function deleteExam(data: Record<string, any>) {
  return request({
    url: "/getInfo",
    method: "post",
    data,
  });
}

export function deleteSchool() {
  return request({
    url: "/getInfo",
    method: "get",
  });
}
