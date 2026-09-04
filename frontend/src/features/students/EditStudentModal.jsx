import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import Modal from "../../components/ui/Modal";

import StudentForm from "./StudentForm";

import {
  updateStudent,
} from "../../services/adminStudentService";


// ============================================================
// EDIT STUDENT MODAL
// ============================================================

function EditStudentModal({
  student,
  close,
  refresh,
}) {

  // ==========================================================
  // LOADING STATE
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

    placement_status: "Training",

    certificate_status: "Pending",

  });


  // ==========================================================
  // LOAD STUDENT INTO FORM
  // ==========================================================

  useEffect(() => {

    if (!student) {

      return;

    }


    setForm({

      full_name:
        student.full_name || "",

      email:
        student.email || "",

      /*
       * Password is intentionally empty.
       *
       * The current backend update API does not
       * update passwords.
       *
       * Do not send a fake password field.
       */

      password: "",

      phone:
        student.phone || "",

      education:
        student.education || "",

      college_name:
        student.college_name || "",

      graduation_year:
        student.graduation_year || "",

      batch_id:
        student.batch_id || "",

      placement_status:
        student.placement_status ||
        "Training",

      certificate_status:
        student.certificate_status ||
        "Pending",

    });

  }, [student]);


  // ==========================================================
  // HANDLE INPUT CHANGE
  // ==========================================================

  const handleChange = (e) => {

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

    // --------------------------------------------------------
    // Student must exist
    // --------------------------------------------------------

    if (!student?.id) {

      toast.error(
        "Student information is missing."
      );

      return false;

    }


    // --------------------------------------------------------
    // Full name
    // --------------------------------------------------------

    if (
      !form.full_name.trim()
    ) {

      toast.error(
        "Full name is required."
      );

      return false;

    }


    // --------------------------------------------------------
    // Email
    // --------------------------------------------------------

    if (
      !form.email.trim()
    ) {

      toast.error(
        "Email is required."
      );

      return false;

    }


    if (
      !form.email.includes("@")
    ) {

      toast.error(
        "Please enter a valid email address."
      );

      return false;

    }


    // --------------------------------------------------------
    // Graduation year
    // --------------------------------------------------------

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


      if (loading) {

        return;

      }


      if (
        !validateForm()
      ) {

        return;

      }


      try {

        setLoading(true);


        // ====================================================
        // ONLY SEND FIELDS CURRENTLY SUPPORTED BY BACKEND
        // ====================================================

        const payload = {

          full_name:
            form.full_name.trim(),

          email:
            form.email.trim().toLowerCase(),

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

          placement_status:
            form.placement_status ||
            "Training",

          certificate_status:
            form.certificate_status ||
            "Pending",

        };


        // ====================================================
        // UPDATE API
        // ====================================================

        const response =
          await updateStudent(

            student.id,

            payload

          );


        // ====================================================
        // SUCCESS
        // ====================================================

        toast.success(

          response?.message ||

          "Student updated successfully."

        );


        // ====================================================
        // REFRESH TABLE
        // ====================================================

        if (
          typeof refresh ===
          "function"
        ) {

          await refresh();

        }


        // ====================================================
        // CLOSE MODAL
        // ====================================================

        close();

      }

      catch (error) {

        console.error(
          "UPDATE STUDENT FRONTEND ERROR:",
          error
        );


        toast.error(

          error?.response?.data?.message ||

          "Failed to update student."

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

      title="Edit Student"

      onClose={close}

    >

      <StudentForm

        form={form}

        handleChange={handleChange}

        handleSubmit={handleSubmit}

        loading={loading}

        buttonText="Update Student"

        close={close}

        isEdit={true}

      />

    </Modal>

  );

}


// ============================================================
// EXPORT
// ============================================================

export default EditStudentModal;