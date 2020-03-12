import { HOMEPAGE_DATA, UPDATE_ABOUT_IMG, UPDATE_BREND, DELETE_BREND, ADD_BREND, UPDATE_SLIDER, ADD_SLIDE, DELETE_SLIDE } from "../actions/types";

const initialState = {
  slider: [],
  brend: [],
  about_image: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HOMEPAGE_DATA:
      return {
        ...state,
        slider: action.payload.slider,
        brend: action.payload.brend,
        about_image: action.payload.about_image
      };
    case UPDATE_ABOUT_IMG:
      return {
        ...state,
        about_image: action.payload.data.about_img
      }
    case ADD_SLIDE:
      return {
        ...state,
        slider: action.payload.data.slider
      }
    case UPDATE_SLIDER:
      return {
        ...state,
        slider: action.payload.data.slider
      }
    case DELETE_SLIDE:
      return {
        ...state,
        slider: action.payload.data.slider
      }
    case ADD_BREND:
      return {
        ...state,
        brend: action.payload.data.brend
      }
    case UPDATE_BREND:
      return {
        ...state,
        brend: action.payload.data.brend
      }
    case DELETE_BREND:
      return {
        ...state,
        brend: action.payload.data.brend
      }
    default:
      return state;
  }
}
