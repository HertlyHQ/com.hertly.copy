const documentTitle = document.title;

const $text = document.getElementById('text');
const $copy = document.getElementById('copy');
const hashVal = () => location.hash.slice(1);
const textVal = () => $text.value;
const textCopy = () => navigator.clipboard.writeText(textVal()) && $text.select();

function titleUpdate () {
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

if (location.hash.length > 1) {
	$text.value = hashVal();
	titleUpdate();
	textCopy();
}

$copy.addEventListener('click', textCopy);

$text.addEventListener('input', function () {
	if (!textVal().length) {
		location.replace('/');
	} else {
		location.replace('#' + textVal());
	}
});

window.addEventListener('hashchange', () => {
	titleUpdate();

	if (hashVal() !== textVal()) {
		$text.value = hashVal();
		titleUpdate();
	}
});
