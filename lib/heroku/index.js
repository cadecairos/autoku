import appInfo from './appInfo';

export default function(request) {
	return {
		appInfo: appInfo(request)
	};
};