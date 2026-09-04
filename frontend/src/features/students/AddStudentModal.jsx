import { useState } from "react";

import toast from "react-hot-toast";

import Modal from "../../components/ui/Modal";

import StudentForm from "./StudentForm";

import {
  createStudent,
} from "../../services/adminStudentService";


// ============================================================
// ADD STUDENT MODAL
// ============================================================

function AddStudentModal({
  close,
  refresh,
}) {


  // ==========================================================
  // LOADING
  // ==========================================================

  const [loading, setLoading] =
    useState(false);


  // ==========================================================
  // FORM STATE
  // ==========================================================

  const [form, setForm] = useState({

    full_name: "",

    email: "",

    password: "",

    phone: "",

    education: "",

    college_name: "",

    graduation_year: "",

    batch_id: "",

    admission_date: "",

    address: "",

    city: "",

    state: "",

    country: "",

    linkedin_url: "",

    github_url: "",

    resume_url: "",

    profile_image: "",

    certificate_status: "Pending",

    placement_status: "Training",

  });


  // ==========================================================
  // HANDLE INPUT
  // ==========================================================

  const handleChange = (
    e
  ) => {

    const {
      name,
      value,
    } = e.target;


    setForm(
      (previous) => ({

        ...previous,

        [name]: value,

      })
    );

  };


  // ==========================================================
  // VALIDATE FORM
  // ==========================================================

  const validateForm = () => {

    const fullName =
      form.full_name.trim();

    const email =
      form.email.trim();

    const password =
      form.password;


    if (!fullName) {

      toast.error(
        "Full name is required."
      );

      return false;

    }


    if (!email) {

      toast.error(
        "Email address is required."
      );

      return false;

    }


    if (
      !email.includes("@")
    ) {

      toast.error(
        "Please enter a valid email address."
      );

      return false;

    }


    if (!password) {

      toast.error(
        "Temporary password is required."
      );

      return false;

    }


    if (
      password.length < 6
    ) {

      toast.error(
        "Password must be at least 6 characters."
      );

      return false;

    }


    if (
      form.graduation_year
    ) {

      const year =
        Number(
          form.graduation_year
        );


      if (
        !Number.isInteger(year) ||
        year < 1900 ||
        year > 2100
      ) {

        toast.error(
          "Please enter a valid graduation year."
        );

        return false;

      }

    }


    return true;

  };


  // ==========================================================
  // HANDLE SUBMIT
  // ==========================================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();


      if (
        loading
      ) {

        return;

      }


      if (
        !validateForm()
      ) {

        return;

      }


      try {

        setLoading(true);


        // ----------------------------------------------
        // Prepare payload
        // ----------------------------------------------

        const payload = {

          full_name:
            form.full_name.trim(),

          email:
            form.email.trim().toLowerCase(),

          password:
            form.password,

          phone:
            form.phone.trim() || null,

          education:
            form.education.trim() || null,

          college_name:
            form.college_name.trim() || null,

          graduation_year:
            form.graduation_year || null,

          batch_id:
            form.batch_id || null,

          admission_date:
            form.admission_date || null,

          address:
            form.address.trim() || null,

          city:
            form.city.trim() || null,

          state:
            form.state.trim() || null,

          country:
            form.country.trim() || null,

          linkedin_url:
            form.linkedin_url.trim() || null,

          github_url:
            form.github_url.trim() || null,

          resume_url:
            form.resume_url.trim() || null,

          profile_image:
            form.profile_image.trim() || null,

          certificate_status:
            form.certificate_status ||
            "Pending",

          placement_status:
            form.placement_status ||
            "Training",

        };


        // ----------------------------------------------
        // API
        // ----------------------------------------------

        const response =
          await createStudent(
            payload
          );


        // ----------------------------------------------
        // SUCCESS
        // ----------------------------------------------

        toast.success(

          response?.message ||

          "Student created successfully."

        );


        // ----------------------------------------------
        // Refresh student list
        // ----------------------------------------------

        if (
          typeof refresh ===
          "function"
        ) {

          await refresh();

        }


        // ----------------------------------------------
        // Close modal
        // ----------------------------------------------

        close();

      }

      catch (error) {

        console.error(
          "CREATE STUDENT FRONTEND ERROR:",
          error
        );


        const message =
          error?.response?.data?.message ||
          "Failed to create student.";


        toast.error(
          message
        );

      }

      finally {

        setLoading(false);

      }

    };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <Modal

      title="Add New Student"

      onClose={close}

    >

      <StudentForm

        form={form}

        handleChange={handleChange}

        handleSubmit={handleSubmit}

        loading={loading}

        buttonText="Create Student"

        close={close}

        isEdit={false}

      />

    </Modal>

  );

}


export default AddStudentModal;