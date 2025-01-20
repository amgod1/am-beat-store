import * as yup from "yup"
import { Tag } from "../interfaces"

export const tagSchema = (allTags: Tag) =>
  yup
    .object({
      tag: yup
        .string()
        .required("tag is required")
        .test(
          "tag-exist",
          "tag is already exist",
          (value) =>
            typeof value === "string" &&
            Object.values(allTags).indexOf(value.trim()) === -1
        )
        .test(
          "tag-empty",
          "tag is required",
          (value) => typeof value === "string" && value.trim() !== ""
        )
        .min(2, "tag min length is 2")
        .max(20, "tag max length is 20"),
    })
    .required()
