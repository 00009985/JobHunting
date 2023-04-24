export const INITIAL_STATE = {
    applicantId: JSON.parse(localStorage.getItem("currentUser"))?._id,
    resumeName: "",
    contactNumber: "",
    Age: "",
    education: "",
    workExperience: "",
    letter: "",
    skills: []
};

export const resumeReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };

        case "ADD_SKILLS":
            return{
                ...state,
                skills: [state.skills, action.payload],
            };
        case "REMOVE_SKILLS":
            return{
                ...state,
                skills: state.skills.filter(
                    (skill) => skill !== action.payload
                )
            }

        default:
            return state;
    }
}