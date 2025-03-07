const documentTitle = document.title;

const $text = document.querySelector('#text');
const $copy = document.querySelector('#copy');
const textVal = () => $text.value;
const textCopy = () => navigator.clipboard.writeText(textVal()) && $text.select();

function titleSet () {
	if (textVal().length) {
		document.title = textVal();
	} else {
		document.title = documentTitle;
	}

	if (textVal().length) {
		$copy.removeAttribute('hidden');
	} else {
		$copy.setAttribute('hidden', true);
	}
}

$text.addEventListener('input', function () {
	if (!textVal().length) {
		location.replace('/');
	} else {
		location.replace('#' + textVal());
	}
});

if (location.hash.length > 1) {
	$text.value = location.hash.slice(1);
	titleSet();
	textCopy();
}

$copy.addEventListener('click', textCopy);
window.addEventListener('hashchange', titleSet);
