class ApiResponce {
    constructor(statuscode, data, mesaage = "success") {
        this.statuscode = statuscode;
        this.data = data;
        this.mesaage = mesaage;
        this.succsess = statuscode < 400;
    }
}
export { ApiResponce };
