import React from 'react'

import { HistoryContainer, HistoryList, Status } from './styles'

export function History (): any {
  return (
        <HistoryContainer>
            <h1>
                Meu histórico
            </h1>
            <HistoryList>
                <table>

                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Portifolio</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>Em andamento</td>
                        </tr>
                        <tr>
                            <td>Estudar</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td> <Status statusColor='red'>Em andamento</Status></td>
                        </tr>
                        <tr>
                            <td>Ler</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td> <Status statusColor='yellow'>Em andamento</Status></td>
                        </tr>
                        <tr>
                            <td>Banana</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>
                                <Status statusColor='green'>Em andamento</Status></td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
  )
}
