import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private collection: CollectionReference<DocumentData>;
  private eventos: Evento[];

  constructor(private readonly firestore: Firestore) {
    this.collection = collection(firestore, 'events');
    this.eventos = [
      {
        fecha: '2023-04-20',
        hora: '14:00',
        cliente: 'Daniel López',
        celular: '3113113112',
        tipo: 'Cumpleaños',
        descripcion: 'Cumpleaños de 15 años',
        alberca: 80,
        mesaRegalos: true,
        colorSobremantel: ['rosa', 'azul'],
        personas: 100,
        brincolin: true,
        precio: 1000,
        anticipo: 500,
        metodo: 'Efectivo',
        saldo: 500,
        estado: 'Apartado',
      },
    ];
  }

  getEventos() {
    return collectionData(this.collection, { idField: 'id' }) as Observable<
      Evento[]
    >;
  }

  getEvento(fecha: string) {
    return collectionData(
      query(this.collection, where('fecha', '==', fecha))
    ) as Observable<Evento[]>;
  }

  async addEvento(evento: Evento) {
    const ref = await addDoc(this.collection, evento);
    return docData(ref);
  }

  updateEvento(evento: Evento) {
    const dcmt = doc(this.firestore, `${this.collection.path}/${evento.id!!}`);
    return updateDoc(dcmt, { ...evento });
  }

  deleteEvento(id: string) {
    return deleteDoc(doc(this.firestore, `${this.collection.path}/${id}`));
  }
}
