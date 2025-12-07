const formAbsensi = document.getElementById('formAbsensi');
const messageDiv = document.getElementById('message');
const dataContainer = document.getElementById('dataContainer');

document.addEventListener('DOMContentLoaded', () => {
    loadAbsensi();
});

formAbsensi.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const jurusan = document.getElementById('jurusan').value;

    try {
        const response = await fetch('api/absensi.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=insert&nama=${encodeURIComponent(nama)}&jurusan=${encodeURIComponent(jurusan)}`
        });

        const result = await response.json();

        if (result.success) {
            showMessage('Absensi berhasil dicatat!', 'success');
            formAbsensi.reset();
            loadAbsensi();
        } else {
            showMessage('Gagal mencatat absensi: ' + result.message, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
});

async function loadAbsensi() {
    try {
        const response = await fetch('api/absensi.php?action=get');
        const result = await response.json();

        if (result.success) {
            const data = result.data;

            if (data.length > 0) {
                let html = '<div class="table-container"><table>';
                html += '<thead><tr><th>No</th><th>Nama</th><th>Jurusan</th><th>Waktu Kehadiran</th></tr></thead><tbody>';

                data.forEach((row, index) => {
                    const waktu = new Date(row.waktu_kehadiran);
                    const waktuFormatted = waktu.toLocaleDateString('id-ID') + ' ' + waktu.toLocaleTimeString('id-ID');

                    html += `<tr>
                        <td>${index + 1}</td>
                        <td>${escapeHtml(row.nama)}</td>
                        <td>${escapeHtml(row.jurusan)}</td>
                        <td>${waktuFormatted}</td>
                    </tr>`;
                });

                html += '</tbody></table></div>';
                dataContainer.innerHTML = html;
            } else {
                dataContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div><p>Belum ada data absensi</p></div>';
            }
        } else {
            dataContainer.innerHTML = '<div class="alert alert-error">Gagal memuat data</div>';
        }
    } catch (error) {
        dataContainer.innerHTML = '<div class="alert alert-error">Error: ' + error.message + '</div>';
    }
}

function showMessage(text, type) {
    messageDiv.innerHTML = `<div class="alert alert-${type}">${text}</div>`;
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 5000);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
