import { CartItem } from "../store"

export const getUpdatedProfileBeats = (
  currentBeats: CartItem[],
  cart: CartItem[]
) => {
  const beatMap = new Map(
    currentBeats.map((beat) => [beat.beatId, { ...beat }])
  )

  cart.forEach((cartBeat) => {
    if (beatMap.has(cartBeat.beatId)) {
      beatMap.get(cartBeat.beatId)!.leasePlanId = cartBeat.leasePlanId
    } else {
      beatMap.set(cartBeat.beatId, { ...cartBeat })
    }
  })

  return Array.from(beatMap.values())
}
