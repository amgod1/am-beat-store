import { TbMicrophone } from "react-icons/tb"
import { MdContentCopy } from "react-icons/md"
import { LuAudioLines } from "react-icons/lu"
import { BsCameraVideo } from "react-icons/bs"
import { TbMicrophone2 } from "react-icons/tb"
import { TbRadio } from "react-icons/tb"

const unlimitedInfo = [
  {
    id: 1,
    icon: TbMicrophone,
    text: "used for music recording",
  },
  {
    id: 2,
    icon: MdContentCopy,
    text: "distribute up to unlimited copies",
  },
  {
    id: 3,
    icon: LuAudioLines,
    text: "unlimited online audio streams",
  },
  {
    id: 4,
    icon: BsCameraVideo,
    text: "unlimited music videos",
  },
  {
    id: 5,
    icon: TbMicrophone2,
    text: "for profit live perfomances",
  },
  {
    id: 6,
    icon: TbRadio,
    text: "radio broadcasting rights (unlimited stations)",
  },
]

export const LEASES = [
  {
    id: 1,
    price: 20,
    title: "basic lease",
    type: "mp3",
    info: [
      {
        id: 1,
        icon: TbMicrophone,
        text: "used for music recording",
      },
      {
        id: 2,
        icon: MdContentCopy,
        text: "distribute up to 10,000 copies",
      },
      {
        id: 3,
        icon: LuAudioLines,
        text: "100,000 online audio streams",
      },
      {
        id: 4,
        icon: BsCameraVideo,
        text: "1 music video",
      },
      {
        id: 5,
        icon: TbMicrophone2,
        text: "for profit live perfomances",
      },
      {
        id: 6,
        icon: TbRadio,
        text: "radio broadcasting rights (2 stations)",
      },
    ],
  },
  {
    id: 2,
    price: 100,
    title: "pro lease",
    type: "mp3, wav, tackouts",
    info: unlimitedInfo,
  },
  {
    id: 3,
    price: 200,
    title: "exclusive lease",
    type: "mp3, wav, tackouts",
    info: unlimitedInfo,
  },
]
