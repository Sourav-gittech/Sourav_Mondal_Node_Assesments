const baseUrl = "http://localhost:4000";

const endPoint_add = "/v2/product/add";

const endPoint_fetch_all = "/v2/product/all/";
const endPoint_fetch_specific = "/v2/product/";
const endPoint_fetch_specific_by_size = "/v2/product/size/";
const endPoint_fetch_specific_by_brand = "/v2/product/brand/";
const endPoint_fetch_specific_by_color = "/v2/product/color/";
const endPoint_fetch_specific_by_price = "/v2/product/price/";
const endPoint_fetch_specific_by_search = "/v2/product/search/";

const endPoint_update_status = "/v2/product/updateStatus/";
const endPoint_update = "/v2/product/update/";

const endPoint_delete = "/v2/product/delete/";

export default baseUrl;
export {
    endPoint_add, endPoint_fetch_all, endPoint_fetch_specific_by_size, endPoint_fetch_specific_by_brand, endPoint_fetch_specific_by_color, endPoint_fetch_specific_by_price,
    endPoint_fetch_specific_by_search, endPoint_fetch_specific, endPoint_update, endPoint_delete, endPoint_update_status
};