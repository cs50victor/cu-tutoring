import tw from "twin.macro"

const Star = (props) => {
  const changeGrade = (e) => {
    props.changeGradeIndex(e.target.value)
  }

  return (
    <label tw="relative cursor-pointer">
      <input
        type="radio"
        name="rating"
        id={props.grade}
        value={props.index}
        tw="absolute top-0 left-0 w-1 h-1"
        onClick={changeGrade}
        style={{ clip: "rect(1px, 1px, 1px, 1px)" }}
      />
      <svg
        width="58"
        height="58"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#393939"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={props.style}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    </label>
  )
}

export default Star
