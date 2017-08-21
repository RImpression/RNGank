export default class DateUtils {
    static getShowDate = (dateString) => {
        let date = dateString.substring(0,10);
        return date;
    }

    static getDateUrl = (dateString) => {
        let year = dateString.substring(0,4);
        let month = dateString.substring(5,7);
        let day = dateString.substring(8,10);
        let dateUrl = year+'/'+month+'/'+day;
        return dateUrl
    }
}