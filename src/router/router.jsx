import { createBrowserRouter } from "react-router-dom";

import AddPatientScreen from '../screens/addPatient/addPatientScreen';
import ListPatientScreen from '../screens/listPatient/listPatientsScreen';
import ProfilePatientScreen from '../screens/profilePatient/profilePatientScreen';


export const router = createBrowserRouter([
    {
      path: "/",
      element: <ListPatientScreen/>,
    },
    {
      path: "/newPatient",
      element: <AddPatientScreen/>,
    },
    {
      path: "/profile",
      element: <ProfilePatientScreen/>,
    }
]);   