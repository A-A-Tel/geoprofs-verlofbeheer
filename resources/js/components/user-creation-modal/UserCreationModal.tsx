import { Form } from '@inertiajs/react';
import { Department, RoleLevel, User } from '@/types/types';
import { useState } from 'react';

function getRoleName(role: RoleLevel) {
    switch (role) {
        case RoleLevel.Employee: return 'Medewerker';
        case RoleLevel.OfficeManager: return 'Kantoormanager';
        case RoleLevel.Administrator: return 'Administrator';
        case RoleLevel.DepartmentManager: return 'Afdelingsleider';
        case RoleLevel.Manager: return 'Manager';
    }
}

function generatePassword() {
    const length = 12;
    const numbers = '1234567890';
    const symbols = '!@#$%^&*()_+{}[]|:;<>,.?/~';
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    chars += numbers;
    chars += symbols;

    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    return password;
}

type Props = {
    departments: Department[];
    users: User[];
};

export function UserCreationModal({ departments, users }: Props) {
    const [role, setRole] = useState(0);
    const [department, setDepartment] = useState(0);
    const [supervisor, setSupervisor] = useState(0);
    const [password] = useState(generatePassword());

    let IsDepartment = true;
    let showSupervisor = false;

    if (role == RoleLevel.OfficeManager){
        IsDepartment = false;
    }
    if (role == RoleLevel.Administrator) {
        IsDepartment = false;
    }

    if (role == RoleLevel.Employee) {
        if (department != 0) {
            showSupervisor = true;
        }
    }

    return (
        <div className={`my-auto`}>
            <Form
                className={'bg-primary-light text-text-primary border-text-secondary m-auto w-full rounded-3xl border-3 p-8'}
                method="post"
                action={route('user.store')}
                onSuccess={async () => {
                    await navigator.clipboard.writeText(password);
                }}
            >
                <h1 className="text-3xl font-bold md:text-4xl">Gebruiker aanmaken</h1>
                <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Naam</h2>
                <div className={'flex gap-6'}>
                    <input
                        name="first_name"
                        required
                        type="text"
                        maxLength={32}
                        placeholder={'Voornaam'}
                        className="bg-primary-dark border-text-secondary flex w-full items-center justify-center rounded-md border-2 p-2 text-lg font-bold md:text-xl"
                    />
                    <input
                        name="last_name"
                        required
                        type="text"
                        maxLength={32}
                        placeholder={'Achternaam'}
                        className="bg-primary-dark border-text-secondary flex w-full items-center justify-center rounded-md border-2 p-2 text-lg font-bold md:text-xl"
                    />
                </div>

                <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Startdatum</h2>
                <input
                    name="started_service_on"
                    required
                    type="date"
                    className="bg-primary-dark border-text-secondary flex w-full cursor-pointer items-center justify-center rounded-md border-2 p-2 text-lg font-bold md:text-xl"
                />

                <input
                    name="password"
                    required
                    type="hidden"
                    value={password}
                />

                <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Rollen</h2>
                <select
                    onChange={(e) => {
                        setRole(Number(e.target.value));
                        setSupervisor(0);
                    }}
                    required
                    name="role_id"
                    defaultValue=""
                    className="bg-primary-dark border-text-secondary flex w-full cursor-pointer items-center justify-center rounded-md border-2 p-2 text-lg font-bold md:text-xl"
                >
                    <option value="" disabled>
                        Kies een rol
                    </option>
                    {Object.values(RoleLevel).map((role) => {
                        if (typeof role === 'string') return;

                        return (
                            <option className={''} key={role} value={role}>
                                {getRoleName(role)}
                            </option>
                        );
                    })}
                </select>

                {IsDepartment && (
                    <>
                        <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Department</h2>
                        <select
                            required
                            name="department_id"
                            value={department || ''}
                            onChange={(e) => {
                                setDepartment(Number(e.target.value));
                                setSupervisor(0);
                            }}
                            className="bg-primary-dark border-text-secondary flex w-full cursor-pointer items-center justify-center rounded-md border-2 p-2 text-lg font-bold md:text-xl"
                        >
                            <option value="" disabled>
                                Kies een department
                            </option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {showSupervisor && (
                    <>
                        <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Supervisor</h2>
                        <select
                            required
                            name="supervisor_id"
                            defaultValue=""
                            value={supervisor || ''}
                            onChange={(e) => setSupervisor(Number(e.target.value))}
                            className="bg-primary-dark border-text-secondary flex w-full cursor-pointer items-center justify-center rounded-md border-2 p-2 text-lg font-bold md:text-xl"
                        >
                            <option value="" disabled>
                                Kies een supervisor
                            </option>
                            {users.map((user) => {
                                if (user.role_id !== RoleLevel.Manager) {
                                    return;
                                }
                                if (user.department_id !== department) {
                                    return;
                                }
                                return (
                                    <option key={user.data.user_id} value={user.data.user_id}>
                                        {user.data.first_name} {user.data.last_name}
                                    </option>
                                );
                            })}
                        </select>
                    </>
                )}

                <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Jaarlijks verloflimiet</h2>
                <input
                    type="number"
                    name="annual_leave_days"
                    className="bg-primary-dark border-text-secondary w-full rounded-md border-2 p-2 text-lg md:text-xl"
                    placeholder="Jaarlijkse hoeveelheid"
                    max={255}
                    required
                />
                <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Telefoonnummer</h2>
                <input
                    type="tel"
                    name="phone_number"
                    className="bg-primary-dark border-text-secondary w-full rounded-md border-2 p-2 text-lg md:text-xl"
                    placeholder="123 - 123 23 21"
                    maxLength={16}
                    pattern="\+?[0-9]{10,15}"
                    required
                />
                <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">BSN</h2>
                <input
                    type="text"
                    name="citizen_service_number"
                    className="bg-primary-dark border-text-secondary w-full rounded-md border-2 p-2 text-lg md:text-xl"
                    placeholder="123456782"
                    pattern="[0-9]{9}"
                    maxLength={9}
                    required
                />
                <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Email</h2>
                <input
                    type="email"
                    name="email"
                    className="bg-primary-dark border-text-secondary w-full rounded-md border-2 p-2 text-lg md:text-xl"
                    placeholder="voorbeeld@email.nl"
                    required
                />
                <button
                    type="submit"
                    className={
                        'bg-background border-text-secondary mt-9 flex w-full cursor-pointer items-center justify-center rounded-md border-2 p-2 text-xl font-bold md:text-2xl'
                    }
                >
                    Maken
                </button>
            </Form>
        </div>
    );
}
