import React, { useContext } from 'react'
import { CyclesContext } from '../../context/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History (): any {
  const { cycles } = useContext(CyclesContext)

  return (
        <HistoryContainer>
            <h1>
                Meu histórico
            </h1>

            <pre>
                {JSON.stringify(cycles, null, 2)}
            </pre>
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
                        {
                            cycles.map((cycle) => {
                              return (
                                    <tr key={cycle.id}>
                                        <td>{cycle.task}</td>
                                        <td>{cycle.minutesAmount} minutos</td>
                                        <td>{formatDistanceToNow(cycle.startDate, {
                                          addSuffix: true,
                                          locale: ptBR
                                        })}</td>
                                        <td>
                                            {(cycle.finishedDate != null) && (
                                                <Status statusColor='green'>Concluído</Status>
                                            )
                                            }
                                            {(cycle.interruptedDate != null) && (
                                                <Status statusColor='red'>Interrompido</Status>
                                            )
                                            }
                                            {(cycle.finishedDate == null) && (cycle.interruptedDate == null) && (
                                                <Status statusColor='yellow'>Em andamento</Status>
                                            )}
                                        </td>
                                    </tr>
                              )
                            })

                        }

                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
  )
}
