import { CartCheckout } from "../interfaces"

export const getUpdatedProfileBeats = ({
  purchasedBeats,
  cart,
}: CartCheckout) => {
  const beatMap = new Map(
    purchasedBeats.map((beat) => [beat.beatId, { ...beat }])
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
