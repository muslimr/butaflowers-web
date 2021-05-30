import Swal from "sweetalert2";


export class Alerts {

    static successModal(success) {
        return Swal.fire({
            position: "top-middle",
            icon: "success",
            title: success,
            showConfirmButton: false,
            timer: 1500,
        }).then();
    }

    static errorModal(error) {
        Swal.fire({
            position: "top-middle",
            icon: "error",
            title: error,
            showConfirmButton: false,
            timer: 1500,
        });
    }

    static askModal(func, elseFunc, labels = {}) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "primary fs-14 fw-500 m-2 px-4",
                cancelButton: "fs-14 fw-500 m-2 px-4",
                title: "fs-30 mt-3 mb-0",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: labels.title || "Вы уверены?",
                showCancelButton: true,
                confirmButtonText: labels.confirmButtonText || "Да, удалить",
                cancelButtonText: labels.cancelButtonText || "Нет, отменить",
            })
            .then(async (result) => {
                if (result.value) {
                    await func();
                } else {
                    elseFunc();
                }
            });
    }
}
