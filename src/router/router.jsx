import { createBrowserRouter } from "react-router-dom";

import AddPatientScreen from '../screens/addPatientScreen';
import ListPatientScreen from '../screens/listPatientsScreen';
import ProfilePatientScreen from '../screens/profilePatientScreen';


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