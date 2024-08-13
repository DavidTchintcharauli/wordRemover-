document.getElementById('cleanBtn').addEventListener('click', () => {
    const stringToRemove = document.getElementById('stringToRemove').value;
    const fileInput = document.getElementById('fileInput').files[0];

    if (stringToRemove && fileInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const cleanedContent = content.replace(new RegExp(stringToRemove, 'g'), '');
            saveCleanedFile(fileInput.name, cleanedContent);
        };
        reader.readAsText(fileInput);
    } else {
        alert('Please provide a string to remove and select a file.');
    }
});

function saveCleanedFile(fileName, content) {
    const a = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(file);
    
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    const createdFilePath = `createdFolder/${fileName}`;
    localStorage.setItem(createdFilePath, content);  // Store the cleaned file content in localStorage
    updateCreatedFilesList();
}

function updateCreatedFilesList() {
    const createdFilesList = document.getElementById('createdFilesList');
    createdFilesList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('createdFolder/')) {
            const file = key.split('/')[1];
            const div = document.createElement('div');
            div.className = 'file-item';
            div.textContent = file;

            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(new Blob([localStorage.getItem(key)], {type: 'text/plain'}));
            downloadLink.download = file;
            downloadLink.textContent = 'Download';
            div.appendChild(downloadLink);

            createdFilesList.appendChild(div);
        }
    }
}

// Initial load of created files list
updateCreatedFilesList();
