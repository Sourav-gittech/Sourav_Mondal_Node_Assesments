import Swal, { SweetAlertIcon } from "sweetalert2";

const getSweetAlert = (title: string, text: string, icon: SweetAlertIcon) => {
    return Swal.fire({
        title,
        text,
        icon,
    });
};

export default getSweetAlert;
