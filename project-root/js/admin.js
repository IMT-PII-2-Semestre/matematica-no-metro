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
                userCard.classList.add('col-md-12', 'mb-3');

                userCard.innerHTML = `
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h5 class="card-title mb-0">Informações sobre o voluntario</h5>
                        </div>
                        <div class="card-body">
                        <p class="card-text"><strong>Nome:</strong> ${user.nome}</p>
                            <p class="card-text"><strong>Email:</strong> ${user.email}</p>
                            <p class="card-text"><strong>Telefone:</strong> ${user.telefone || 'N/A'}</p>
                            <p class="card-text"><strong>Curso:</strong> ${user.curso || 'N/A'}</p>
                            <p class="card-text"><strong>Data de Nascimento:</strong> ${user.dataNascimento || 'N/A'}</p>
                            <p class="card-text"><strong>Nivel de Conhecimento:</strong> ${user.nivelConhecimento || 'N/A'}</p>
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
                feedbackCard.classList.add('col-md-12', 'mb-3');

                feedbackCard.innerHTML = `
                    <div class="card">
                        <div class="card-header bg-success text-white">
                            <h5 class="card-title mb-0">${feedback.nome}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><strong>Email:</strong> ${feedback.email}</p>
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
