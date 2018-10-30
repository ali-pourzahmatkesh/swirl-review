import CountryCodeModal from "./CountryCodeModal";
import { connect } from "react-redux";
import { getIpData, getCountries } from "../../../store/member";

const mapStateToProps = state => ({
	isLoadingFetch: state.app.member.isLoadingFetch,
	ipData: state.app.member.ipData,
	countries: state.app.member.countries
});

const mapDispatchToProps = dispatch => ({
	getIpData: () =>
		setTimeout(() => {
			dispatch(getIpData());
		}, 1),
    getCountries: () => 
        setTimeout(() => {
            dispatch(getCountries());
        }, 1),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryCodeModal);
