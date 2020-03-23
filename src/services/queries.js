// JavaScript template literal tag that parses GraphQL queries into an abstract syntax tree (AST)
import gql from "graphql-tag";
export const ALL_PERSONS_LIST = gql`
  query {
    persons {
      allPersons {
        name
        id
        age
        job
        lat
        lng
        cameras {
          id
          name
        }
      }
    }
  }
`;
export const CREATE_PERSON = gql`
  mutation($person: InputPersonType!) {
    persons {
      addPerson(person: $person) {
        name
        id
        age
        job
        lat
        lng
      }
    }
  }
`;

export const ALL_CAMERAS_LIST = gql`
  query {
    cameras {
      allCameras {
        name
        id
        isAvailable
      }
    }
  }
`;

export const CREATE_CAMERA = gql`
  mutation($camera: InputCameraType!) {
    cameras {
      addCamera(camera: $camera) {
        name
        id
      }
    }
  }
`;

export const UPDATE_CAMERA = gql`
  mutation($camera: InputCameraType!) {
    cameras {
      updateCamera(camera: $camera) {
        name
        id
      }
    }
  }
`;

export const ALL_PERSONS_AND_CAMERAS_LIST = gql`
  query {
    persons {
      allPersons {
        name
        id
        age
        job
        lat
        lng
        cameras {
          id
          name
        }
      }
    }

    cameras {
      allCameras {
        name
        id
        isAvailable
      }
    }
  }
`;
