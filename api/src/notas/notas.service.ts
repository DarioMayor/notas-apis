import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { JsonDb } from '../database/json-db';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { Nota } from './entities/nota.entity';

@Injectable()
export class NotasService {
  constructor(private readonly db: JsonDb) {}

  create(dto: CreateNotaDto): Promise<{ note: Nota }> {
    return this.db.update((data) => {
      const note: Nota = {
        id: randomUUID(),
        title: dto.title.trim(),
        text: dto.text.trim(),
        minutes: dto.minutes,
        createdAt: Date.now(),
        notified: dto.notified ?? false,
      };
      data.notas.push(note);
      return { note };
    });
  }

  async findAll(): Promise<{ notes: Nota[] }> {
    const data = await this.db.read();
    return { notes: [...data.notas].sort((a, b) => b.createdAt - a.createdAt) };
  }

  async findOne(id: string): Promise<{ note: Nota }> {
    const data = await this.db.read();
    const note = data.notas.find((item) => item.id === id);
    if (!note) throw new NotFoundException('Nota no encontrada');
    return { note };
  }

  update(id: string, dto: UpdateNotaDto): Promise<{ note: Nota }> {
    return this.db.update((data) => {
      const note = data.notas.find((item) => item.id === id);
      if (!note) throw new NotFoundException('Nota no encontrada');
      if (dto.title !== undefined) note.title = dto.title.trim();
      if (dto.text !== undefined) note.text = dto.text.trim();
      if (dto.minutes !== undefined) note.minutes = dto.minutes;
      if (dto.notified !== undefined) note.notified = dto.notified;
      if (dto.title !== undefined || dto.text !== undefined || dto.minutes !== undefined) {
        note.createdAt = Date.now();
        note.notified = false;
      }
      return { note };
    });
  }

  remove(id: string): Promise<{ ok: true }> {
    return this.db.update((data) => {
      const index = data.notas.findIndex((item) => item.id === id);
      if (index === -1) throw new NotFoundException('Nota no encontrada');
      data.notas.splice(index, 1);
      return { ok: true };
    });
  }
}
