document.addEventListener('DOMContentLoaded', function() {
    // Buscar usuários do backend
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const usersContainer = document.getElementById('users-container');
            
            if (users.length === 0) {
                usersContainer.innerHTML = '<p>Nenhum usuário encontrado.</p>';
                return;
            }

            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.classList.add('col'); // Define uma coluna responsiva

                userCard.innerHTML = `
                    <div class="card h-100">
                        <div class="card-header bg-primary text-white">
                            <h5 class="card-title mb-0">Informações sobre o Voluntário</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><strong>Nome:</strong> ${user.nome}</p>
                            <p class="card-text"><strong>Telefone:</strong> ${user.telefone || 'N/A'}</p>
                            <p class="card-text"><strong>Curso:</strong> ${user.curso || 'N/A'}</p>
                            <p class="card-text"><strong>Data de Nascimento:</strong> ${user.dataNascimento || 'N/A'}</p>
                            <p class="card-text"><strong>Nível de Conhecimento:</strong> ${user.nivelConhecimento || 'N/A'}</p>
                            <p class="card-text"><strong>Disponibilidade:</strong> ${user.disponibilidade || 'N/A'}</p>
                        </div>
                    </div>
                `;
                usersContainer.appendChild(userCard);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar usuários:', error);
            document.getElementById('users-container').innerHTML = '<p>Erro ao carregar os dados dos usuários.</p>';
        });

    // Buscar feedbacks do backend
    fetch('/api/feedbacks')
        .then(response => response.json())
        .then(feedbacks => {
            const feedbacksContainer = document.getElementById('feedbacks-container');
            
            if (feedbacks.length === 0) {
                feedbacksContainer.innerHTML = '<p>Nenhum feedback encontrado.</p>';
                return;
            }

            feedbacks.forEach(feedback => {
                const feedbackCard = document.createElement('div');
                feedbackCard.classList.add('col'); // Define uma coluna responsiva

                feedbackCard.innerHTML = `
                    <div class="card h-100">
                        <div class="card-header bg-success text-white">
                            <h5 class="card-title mb-0">${feedback.nome}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><strong>Mensagem:</strong> ${feedback.mensagem}</p>
                        </div>
                    </div>
                `;
                feedbacksContainer.appendChild(feedbackCard);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar feedbacks:', error);
            document.getElementById('feedbacks-container').innerHTML = '<p>Erro ao carregar os dados dos feedbacks.</p>';
        });
});
