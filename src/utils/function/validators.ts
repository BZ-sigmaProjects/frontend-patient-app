// pure finction
export function isValidCin(cin: string): boolean{
    return true
}
export function isValidName(name: string): boolean{
    //add regex
    return true
}
export function isValidGender(gender: string): boolean{
    return gender === 'F' || gender === 'H';
}
export function isValidDate(date: string): boolean{
    //check type of date attribute, it should not be string to chnage after
    return true
}
export function isValidInsurance(insurance: string): boolean{
    return insurance === 'CNOPS' || insurance === 'FAR';
}
export function isValidNumAdherent(num: string): boolean{
    //to check with team use typeOf or regex
    return true
}
export function isValidProvince(province: string): boolean{
    //to check regex or check a list of province in morocco
    return true
}
export function isValidCity(city: string): boolean{
    //to check with team use typeOf or regex
    return true
}
export function isValidPhone(phone: string): boolean{
    //to check use regex
    return true
}
export function isValidAddress(address: string): boolean{
    //to check use regex it should be a string with max and min char
    return true
}

