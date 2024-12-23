import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../store"
import { DoublyLinkedList } from "../data-structures"

const selectBeats = (state: RootState) => state.beats

export const selectAllBeats = createSelector(
  [selectBeats],
  (beats) => beats.beats
)

export const selectBeatsInfo = createSelector(
  [selectBeats],
  (beats) => beats.info
)

export const selectBeatsStatus = createSelector(
  [selectBeats],
  (beats) => beats.status
)

export const selectBeatsDLL = createSelector([selectBeats], (beats) => {
  const beatsDoublyLinkedList = new DoublyLinkedList()

  for (const beat of beats.beats) {
    beatsDoublyLinkedList.insertAtEnd(beat)
  }

  return beatsDoublyLinkedList
})
